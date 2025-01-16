import React from "react";
import { useTranslation } from "react-i18next";
import Joyride, { CallBackProps, Locale, Step, Styles } from "react-joyride";

interface GuideTourProps {
  steps: Step[];
  run: boolean;
  // eslint-disable-next-line no-unused-vars
  callback?: (data: CallBackProps) => void;
}

const GuideTour: React.FC<GuideTourProps> = ({ steps, run, callback }) => {
  const { t } = useTranslation();

  const locale: Locale = {
    last: t("Finish"),
    back: t("Back"),
    close: t("Close"),
    next: t("Next"),
    skip: t("Skip"),
    nextLabelWithProgress: `${t("Next")} {step} / {steps}`,
  };

  const joyrideStyles: Partial<Styles> = {
    options: {
      arrowColor: "#12141e",
      backgroundColor: "#12141e",
      overlayColor: "rgba(11, 13, 20, 0.8)",
      primaryColor: "#6A60E8",
      textColor: "#fffffff2",
      width: 400,
      zIndex: 1000,
    },
    tooltip: {
      backgroundColor: "#12141e",
      borderRadius: 8,
      color: "#fffffff2",
      fontSize: "14px",
      padding: "16px",
    },
    tooltipContainer: {
      textAlign: "left" as const,
    },
    tooltipTitle: {
      color: "#fffffff2",
      fontSize: "16px",
      fontWeight: "bold",
    },
    tooltipContent: {
      color: "#b5b7da",
      fontSize: "14px",
    },
    buttonBack: {
      color: "#b5b7da",
      fontSize: "14px",
    },
    buttonNext: {
      backgroundColor: "#6A60E8",
      color: "#fffffff2",
      fontSize: "14px",
      borderRadius: 4,
    },
    buttonSkip: {
      color: "#fc4a71",
      fontSize: "14px",
    },
    beacon: {
      backgroundColor: "#6A60E8",
      border: "2px solid #6A60E8",
      borderRadius: "50%",
      width: "20px",
      height: "20px",
    },
    spotlight: {
      borderRadius: 12,
      boxShadow: "0 0 15px rgba(106, 96, 232, 0.5)",
    },
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous
      showProgress
      showSkipButton
      scrollToFirstStep
      styles={joyrideStyles}
      callback={callback}
      locale={locale}
    />
  );
};

export default GuideTour;
