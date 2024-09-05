import React from "react";
import { Container, Signup as SignupComponent } from "../components";
import Transition from "../components/transition";

function SignupPage() {
  return (
    <Container showFooter={false}>
      <div className="min-h-screen w-full flex flex-col lg:flex-row justify-center items-center">
        <div className="w-full lg:w-[55%] h-[35%] lg:h-auto flex flex-col mt-32 lg:mt-0">
          <div className="h-full pb-12 lg:pb-48 text-[7rem] sm:text-[10rem] md:text-[13rem] lg:text-[16rem] text-nowrap font-unicaOne font-semibold opacity-25 leading-3 tracking-tighter">
            Sign up
          </div>
          <div className="w-full h-full pl-2 sm:pl-4 md:mt-16 lg:mt-0 lg:pl-7 text-xl sm:text-xl md:text-2xl font-SourceCodePro text-gray-600 flex flex-col justify-end gap-0 lg:gap-4 relative">
            <p className="max-w-full inline-block tracking-widest overflow-hidden sm:whitespace-nowrap animate-typewriterWithoutBlink">
              Don&apos;t miss out! Sign up now to publish your
            </p>
            <p className="max-w-full inline-block tracking-widest md:tracking-wide lg:tracking-widest overflow-hidden sm:whitespace-nowrap animate-typewriterWithoutBlink delay-3000">
              thoughts, engage with content, and stay updated
            </p>
            <p className="max-w-full inline-block overflow-hidden sm:whitespace-nowrap animate-typewriterWithoutBlink delay-5000">
              with the latest posts.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center items-center mt-16 mb-24 lg:mb-0 lg:mt-4">
          <div className="w-5/6 sm:w-4/6 animate-slideInRight no-scrollbar">
            <SignupComponent />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Transition(SignupPage);
