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
      arrowColor: "#1f2236",
      backgroundColor: "#12141e",
      overlayColor: "rgba(11, 13, 20, 0.9)",
      primaryColor: "#6A60E8",
      textColor: "#fffffff2",
      spotlightShadow: "0 0 15px rgba(106, 96, 232, 0.5)",
      width: 400,
      zIndex: 1000,
    },
    tooltip: {
      backgroundColor: "#12141e",
      borderRadius: 8,
      color: "#fffffff2",
      fontSize: "14px",
      padding: "0",
      border: "2px solid #1f2236",
    },
    tooltipContainer: {
      textAlign: "left",
    },
    tooltipTitle: {
      color: "#fffffff",
      fontSize: "16px",
      fontWeight: "500",
      padding: "16px",
      borderBottom: "2px solid #1f2236",
    },
    tooltipContent: {
      color: "#fffffff2",
      fontSize: "14px",
      padding: "16px",
      fontWeight: "normal",
    },
    tooltipFooter: {
      padding: "0px 16px 16px 16px",
      marginTop: "0",
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
      outline: "none",
    },
    buttonSkip: {
      color: "#fc4a71",
      fontSize: "14px",
      padding: "0px",
    },
    buttonClose: {
      top: 6,
    },
    beacon: {
      backgroundColor: "#6A60E8",
      border: "2px solid #6A60E8",
      borderRadius: "50%",
      width: "24px",
      height: "24px",
      animation: "pulse 1.5s infinite",
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
      beaconComponent={(props) => (
        <div {...props} className="react-joyride__beacon" />
      )}
    />
  );
};

export default GuideTour;
