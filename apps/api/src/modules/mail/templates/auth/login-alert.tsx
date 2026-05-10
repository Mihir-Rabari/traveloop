import { Section, Text } from "@react-email/components";
import * as React from "react";
import { BaseLayout } from "../layouts/base-layout";

interface LoginAlertProps {
  email: string;
  time: string;
}

export const LoginAlertTemplate = ({ email, time }: LoginAlertProps) => (
  <BaseLayout previewText="New login to your Traveloop account">
    <Section style={content}>
      <Text style={heading}>New Login Alert</Text>
      <Text style={paragraph}>
        Hello, we detected a new login to your Traveloop account ({email}) at {time}.
      </Text>
      <Text style={paragraph}>
        If this was you, you can safely ignore this email.
      </Text>
      <Text style={paragraph}>
        If you don't recognize this activity, please reset your password immediately and contact our support team.
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

export default LoginAlertTemplate;
