import React from "react";
import { Container, Login as LoginComponent } from "../components";
import Transition from "../components/transition";

function LoginPage() {
  return (
    <Container showFooter={false}>
      <div className="min-h-screen w-full flex flex-col lg:flex-row justify-center items-center">
        <div className="w-full lg:w-[55%] h-[35%] lg:h-auto flex flex-col mt-32 lg:mt-0">
          <div className="h-full pb-12 lg:pb-48 text-[7rem] sm:text-[10rem] md:text-[15rem] lg:text-[19rem] text-nowrap font-unicaOne font-semibold opacity-25 leading-3 tracking-tighter">
            Login
          </div>
          <div className="w-full h-full pl-2 sm:pl-5 md:mt-16 lg:mt-0 lg:pl-7 text-lg sm:text-xl md:text-2xl font-SourceCodePro text-gray-600 flex flex-col justify-end gap-4 relative">
            <p className="max-w-full inline-block overflow-hidden sm:whitespace-nowrap animate-typewriterWithoutBlink">
              Welcome Back! Ready to dive into your latest reads?
            </p>
            <p className="max-w-max inline-block overflow-hidden whitespace-nowrap animate-typewriterWithoutBlink delay-3000">
              Log in to continue.
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 max-h-max lg:h-full flex justify-center items-center">
          <div className="w-5/6 sm:w-4/6 animate-slideInRight no-scrollbar">
            <LoginComponent />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Transition(LoginPage);
