import React ,{useState, useEffect}from "react";
import "./MultiStepProgressBar.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import Lottie from "lottie-react";
import groovyWalkAnimation from "./check.json";
const MultiStepProgressBar = ({ page, onPageNumberClick }) => {
  const [stepPercentage, setStepPercentage] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
    setStepPercentage(15)
  }, 4000); 
    return () => clearTimeout(timeout); // Cleanup function to clear timeout if component unmounts
  }, [page]); // Dependency array ensures useEffect runs when 'page' prop changes


  return (
    <ProgressBar percent={stepPercentage}
    
    >
   
    
   
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null} transitionStep ${accomplished ? "accomplished" : null}`}
            
          >
         <Lottie className='container' animationData={groovyWalkAnimation} loop={false} />
         <div style={{marginTop :'6px'}} className="text">Excite module </div>
          </div>
         
        )
        

        }
        
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
            
            <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}

            onClick={() => onPageNumberClick("3")}
          >
           
          <div
            
            style={{marginTop :'6px'}}
            
          >
         2
            </div>
            <div className="text1">Relate module</div>
          </div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div
            className={`indexedStep ${accomplished ? "accomplished" : null}`}

          
          >
           
          <div
            
            style={{marginTop :'6px'}}
            
          >
         3
            </div>
            <div className="text1">Purpose module</div>
          </div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div
          className={`indexedStep ${accomplished ? "accomplished" : null}`}

          onClick={() => onPageNumberClick("3")}
        >
         
        <div
          
          style={{marginTop :'6px'}}
          
        >
       4
          </div>
          <div className="text1">Possibility module</div>
        </div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div
          className={`indexedStep ${accomplished ? "accomplished" : null}`}

          onClick={() => onPageNumberClick("3")}
        >
         
        <div
          
          style={{marginTop :'6px'}}
          
        >
       5
          </div>
          <div className="text1">Ethics module</div>
        </div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished, index }) => (
          <div
          className={`indexedStep ${accomplished ? "accomplished" : null}`}

        >
         
        <div
          
          style={{marginTop :'6px'}}
          
        >
       6
          </div>
          <div className="text1">Build module</div>
        </div>
        )}
      </Step>
    </ProgressBar>
  );
};

export default MultiStepProgressBar;
