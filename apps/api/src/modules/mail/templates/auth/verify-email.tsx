import { Section, Text } from "@react-email/components";
import * as React from "react";
import { BaseLayout } from "../layouts/base-layout";

interface VerifyEmailProps {
  otp: string;
}

export const VerifyEmailTemplate = ({ otp }: VerifyEmailProps) => (
  <BaseLayout previewText="Verify your email address">
    <Section style={content}>
      <Text style={heading}>Verify Your Email</Text>
      <Text style={paragraph}>
        Welcome to Traveloop! Please use the following code to verify your email address:
      </Text>
      <Section style={otpContainer}>
        <Text style={otpText}>{otp}</Text>
      </Section>
      <Text style={paragraph}>
        This code will expire in 10 minutes. If you did not request this, please ignore this email.
      </Text>
    </Section>
  </BaseLayout>
);

const content = {
  padding: "0 48px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "30px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#484848",
};

const otpContainer = {
  backgroundColor: "#f4f4f4",
  borderRadius: "4px",
  margin: "24px 0",
  padding: "24px",
  textAlign: "center" as const,
};

const otpText = {
  fontSize: "32px",
  fontWeight: "bold",
  letterSpacing: "4px",
  color: "#3b82f6",
  margin: "0",
};

export default VerifyEmailTemplate;
