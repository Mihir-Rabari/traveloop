import { Router } from "express";

const router = Router();

// Auth Email Routes
router.post("/send-verification", (req, res) => {
  res.status(202).json({ message: "Verification email queued" });
});

router.post("/verify-email", (req, res) => {
  res.status(200).json({ message: "Email verified successfully" });
});

router.post("/resend-otp", (req, res) => {
  res.status(202).json({ message: "New OTP sent" });
});

router.post("/forgot-password", (req, res) => {
  res.status(202).json({ message: "Password reset email queued" });
});

router.post("/reset-password", (req, res) => {
  res.status(200).json({ message: "Password reset successfully" });
});

export default router;
