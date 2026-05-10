import { render } from "@react-email/components";
import React from "react";

export const renderTemplate = async (template: React.ReactElement): Promise<string> => {
  return await render(template);
};
