import React, { useEffect, useRef, useState } from "react";

const Stepper = ({ stepsConfig = [] }) => {
  const [currStep, setCurrStep] = useState(1);
  const [isComplete, setIsComplet] = useState(false);
  const [margin, setMargin] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef([]);

  const handleNext = () => {
    setCurrStep((prev) => {
      if (currStep === stepsConfig.length) {
        setIsComplet(true);
        return prev;
      } else {
        return prev + 1;
      }
    });
  };
  useEffect(() => {
    setMargin({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[stepsConfig.length - 1].offsetWidth / 2,
    });
    console.log(stepRef.current[stepsConfig.length - 1].offsetWidth);
    console.log(stepRef.current[0].offsetWidth);
  }, [stepRef]);

  const calcWidth = () => {
    return ((currStep - 1) / (stepsConfig.length - 1)) * 100;
  };
  return (
    <>
      <div className="stepper">
        {stepsConfig.map((step, index) => (
          <div
            key={index}
            ref={(el) => (stepRef.current[index] = el)}
            className={`step ${
              currStep > index + 1 || isComplete ? "complete" : ""
            } ${currStep === index + 1 ? "active" : ""}`}
          >
            <div className="step-number">
              {currStep > index + 1 || isComplete ? (
                <span>&#10003;</span>
              ) : (
                index + 1
              )}
            </div>
            <div className="step-name">{step.name}</div>
          </div>
        ))}
        <div
          className="progress-bar"
          style={{
            width: `calc(100% - ${margin.marginLeft + margin.marginRight}px)`,
            marginLeft: margin.marginLeft,
            marginRight: margin.map,
          }}
        >
          <div className="progress" style={{ width: `${calcWidth()}%` }}></div>
        </div>
      </div>
      {!isComplete && (
         <button className="btn" onClick={handleNext}>
        {currStep === stepsConfig.length ? 'Finsh' : 'Next'}
       </button>
      )}
     
    </>
  );
};

export default Stepper;
