import fetch from "node-fetch";

interface RecaptchaResponse {
  success: boolean;
  score: number;
  action: string;
}

const verifyCaptcha = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch(process.env.G_RECAPTCHA_URL as string, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.G_RECAPTCHA_SECRET_KEY}&response=${token}`,
    });

    const data = await response.json();

    // Validate the structure of the data object
    if (
      typeof data === "object" &&
      data !== null &&
      "success" in data &&
      "score" in data &&
      "action" in data
    ) {
      const { success, score, action } = data as RecaptchaResponse;

      if (success && score >= 0.5 && action === "submit") {
        return true;
      }
    }
  } catch (error) {
    console.error("Error during reCAPTCHA verification:", error);
  }
  return false;
};

export default verifyCaptcha;
