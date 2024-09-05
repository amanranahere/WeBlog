import React, { useEffect } from "react";
import { Container } from "../components";
import Transition from "../components/transition";
import ScrollingWords from "../components/ScrollingWords";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  // draw on scroll SVG
  useEffect(() => {
    const svgLg = document.querySelector("svg.squiggleLg");
    const pathLg = svgLg.querySelector("path");

    const scroll = () => {
      const distance = window.scrollY;
      const totalDistance = document.body.clientHeight - window.innerHeight;
      const percentage = distance / totalDistance;
      const pathLength = pathLg.getTotalLength();

      pathLg.style.strokeDasharray = `${pathLength}`;
      pathLg.style.strokeDashoffset = `${pathLength * (1 - percentage)}`;
    };

    scroll();

    window.addEventListener("scroll", scroll);

    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  return (
    <Container>
      <ScrollingWords />

      <div className="max-h-max w-full flex flex-col justify-center items-center my-28">
        <div className="h-auto w-[90%] md:w-[75%] lg:w-[65%]">
          <div className="w-full h-full px-4 text-[5vw] sm:text-[4vw] md:text-[3vw] lg:text-[2vw] font-SourceCodePro flex flex-col justify-center items-center relative bg-hero-pattern bg-bottom bg-repeat-x pb-20">
            <p className="relative sm:z-50 lg:z-auto max-w-max inline-block -tracking-normal overflow-hidden sm:whitespace-nowrap animate-typewriterWithoutBlink delay-6000">
              Blogging is a journey of growth and discovery.
            </p>
            <p className="max-w-max inline-block -tracking-normal overflow-hidden sm:whitespace-nowrap animate-typewriterWithoutBlink delay-8000">
              As we aspire and dream, we explore new perspectives
            </p>
            <p className="max-w-max inline-block -tracking-normal overflow-hidden sm:whitespace-nowrap animate-typewriterWithoutBlink delay-10000">
              and connect with others. This journey, reflected
            </p>
            <p className="max-w-max inline-block tracking-widest overflow-hidden sm:whitespace-nowrap animate-typewriterWithoutBlink delay-12000">
              in the words above, turns thoughts into
            </p>
            <p className="max-w-max inline-block -tracking-normal overflow-hidden sm:whitespace-nowrap animate-typewriterWithoutBlink delay-13500">
              action and ideas into impact.
            </p>
          </div>
        </div>

        {/* svg */}
        <svg
          className="squiggleLg absolute top-20 pt-6 z-10 hidden lg:block"
          width="1512"
          height="3689"
          viewBox="0 0 1562 3689"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M373.129 2C369.174 38.377 352.27 31.6933 330.911 49.1542C294.773 78.6958 331.487 67.519 337.292 88.2821C346.05 119.603 316.382 125.542 311.765 151.489C305.298 187.836 348.412 178.792 364.293 202.656C382.708 230.33 410.838 211.353 408.475 254.827C406.392 293.131 364.488 276.053 342.692 282.417C287.081 298.653 275.342 339.901 249.419 386.256C234.645 412.676 226.03 415.502 240.583 448.962C251.967 475.136 248.134 507.653 284.765 507.653C330.231 507.653 338.194 639.752 297.529 651.624C239.58 668.543 197.628 711.57 247.456 762.487C257.146 772.389 249.419 823.127 249.419 837.231C249.419 864.239 228.181 893.934 205.237 906.959C150.012 938.311 214.074 1005 214.074 1035.88C214.074 1079.78 231.917 1052.87 253.347 1081.03C274.933 1109.39 238.076 1149.96 284.765 1152.76C308.789 1154.21 291.946 1196 328.947 1193.9C350.632 1192.67 386.52 1140.21 400.129 1188.88C408.863 1220.12 499.607 1298.14 523.348 1243.56C539.443 1206.55 627.8 1214.35 651.967 1239.04C668.8 1256.25 678.167 1268.12 704.003 1275.66C721.484 1280.77 760.569 1284.83 761.931 1311.28C764.309 1357.46 680.166 1419.64 775.185 1419.64C808.099 1419.64 795.752 1391.94 797.276 1365.46C798.778 1339.38 860.933 1370.7 867.477 1378.5C882.992 1397 910.099 1404.69 924.913 1424.15C949.797 1456.84 954.029 1449.76 967.132 1419.64C976.739 1397.55 963.795 1356.94 998.55 1367.46C1018.91 1373.63 1047.37 1433.96 1066.3 1414.62C1086.51 1393.96 1104.31 1379.89 1133.06 1405.59C1158.43 1428.27 1164.62 1420.53 1196.88 1430.67C1248.75 1446.98 1329.28 1421.49 1371.64 1464.78C1418.74 1512.91 1304.91 1512.34 1319.12 1577.65C1326.37 1611.01 1353.97 1610.15 1353.97 1647.38C1353.97 1682.73 1360.79 1693.84 1394.22 1700.05C1447.56 1709.96 1474.66 1786.9 1435.46 1818.94C1418.27 1833 1380.48 1840.71 1380.48 1866.6C1380.48 1912.73 1367.28 1916.26 1327.46 1916.26C1303.65 1916.26 1274.44 1879.72 1274.44 1925.29C1274.44 1953.39 1264.18 1970.44 1234.68 1970.44C1148.47 1970.44 1217.85 2068.37 1159.57 2094.84C1128.29 2109.05 1095.62 2078.14 1082 2051.7C1075.16 2038.42 1068.01 2028.02 1060.4 2015.58C1051.5 2001.03 1027.4 2005.93 1014.75 1993.01C986.49 1964.13 975.112 1927.14 954.368 1986.49C945.178 2012.78 908.121 2051.77 885.64 2011.57C880.859 2003.02 843.634 1969.16 837.531 1970.94C813.348 1978 811.015 2008.34 779.604 2006.55C746.654 2004.68 748.373 1951.64 721.676 1943.85C692.241 1935.26 672.008 1951.97 647.057 1929.3C634.05 1917.49 602.474 1916.26 585.203 1916.26C546.671 1916.26 545.138 1952.38 505.184 1952.38C492.396 1952.38 364.293 1866.15 364.293 1938.83C364.293 1978.02 403.959 1948.77 421.238 1966.42C433.248 1978.7 429.898 2023.4 408.475 2024.61C374.553 2026.54 364.42 1997.53 328.947 1997.53C307.547 1997.53 260.077 1985.58 267.583 2020.1C275.528 2056.63 387.159 2064.45 328.947 2123.94C307.597 2145.75 311.274 2159.45 311.274 2191.66C311.274 2211 260.403 2206.07 244.51 2223.26C226.858 2242.36 240.591 2284.97 267.092 2286.47C303.008 2288.51 302.438 2289.65 302.438 2327.1C302.438 2337.66 296.633 2391.19 307.347 2394.32C333.133 2401.85 362.042 2389.55 364.293 2430.94C365.566 2454.37 363.695 2479 348.583 2496.16C317.374 2531.59 362.046 2530.27 386.384 2530.27C439.592 2530.27 407.823 2634.03 417.802 2669.72C420.863 2680.67 473.257 2674.74 483.584 2674.74C509.904 2674.74 522.634 2683.19 542.984 2699.82C573.04 2724.39 585.203 2687.18 585.203 2665.71C585.203 2638.82 614.347 2621.64 633.803 2648.15C651.693 2672.53 664.05 2694.12 678.476 2719.39C695.328 2748.91 685.279 2766.34 717.749 2781.09C740.835 2791.57 788.298 2775.67 796.786 2814.7C802.641 2841.62 818.415 2858.77 850.295 2844.29C896.711 2823.21 954.744 2819.13 982.841 2869.38C990.034 2882.24 1014.56 2918.82 1027.02 2925.56C1065.33 2946.28 1062.03 2905.09 1076.11 2900.98C1100.03 2894 1124.42 2904.03 1146.31 2909.01C1163.06 2912.81 1175.24 2904.44 1190.5 2900.98C1206.51 2897.34 1215.7 2908.72 1230.26 2909.51C1259.02 2911.05 1267.19 2930.98 1274.93 2958.67C1281.87 2983.47 1330.8 2987.05 1350.04 2995.79C1408.69 3022.43 1474.34 3029.42 1429.08 3112.67C1418.41 3132.29 1410.04 3149.67 1437.92 3162.33C1473.15 3178.34 1468.84 3199.41 1468.84 3234.57C1468.84 3282.09 1518.08 3282.5 1548.37 3311.82C1577.98 3340.49 1544.97 3360.98 1516.95 3360.98C1472.56 3360.98 1468.84 3359.37 1468.84 3406.13C1468.84 3423.41 1477.59 3472.87 1455.59 3477.87C1434.55 3482.64 1406.18 3483.52 1398.64 3510.47C1389.96 3541.53 1392.93 3550.6 1353.97 3550.6C1326.17 3550.6 1304.91 3547.99 1278.86 3542.08C1236.38 3532.43 1222.16 3575.64 1186.08 3577.69C1158.6 3579.25 1120.06 3556.13 1097.71 3577.69C1068.94 3605.46 1090.05 3635.66 1049.6 3654.44C1022.01 3667.26 1001.72 3652.29 982.841 3631.87C965.822 3613.45 937.146 3573.36 929.332 3609.3C924.356 3632.17 900.693 3670.6 876.313 3667.49C826.022 3661.06 818.668 3648.56 788.44 3613.81C779.037 3603 750.799 3554.44 728.549 3579.7C715.136 3594.93 730.686 3599.32 706.949 3606.79C688.738 3612.51 674.895 3613.81 655.894 3613.81C627.621 3613.81 607.928 3591.12 580.294 3596.25C537.408 3604.22 547.37 3631.34 523.348 3658.96C480.719 3707.96 416.932 3686.83 388.838 3640.9C370.213 3610.45 381.965 3606.8 381.965 3568.66C381.965 3561.1 385.59 3540.26 380.002 3534.55C370.851 3525.2 341.008 3533.52 338.274 3546.09C329.181 3587.9 356.973 3613.81 300.474 3613.81C277.838 3613.81 260.224 3613.04 240.583 3624.85C226.924 3633.06 234.476 3651.71 226.837 3663.97C209.013 3692.6 186.705 3686.05 156.637 3686.05C109.597 3686.05 127.588 3678.84 110.001 3640.9C97.4515 3613.83 90.364 3604.11 90.364 3573.18C90.364 3525.56 14.6058 3553.13 2 3514.49"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        {/* about 'blog' */}
        <div className="h-screen w-full my-20 md:my-auto sm:my-40 flex flex-col sm:flex-row">
          <div className="z-50 h-full lg:ml-4 sm:ml-10 md:ml-0 pt-[35rem] md:pt-[60rem] lg:pt-48 flex flex-col justify-center items-center lg:items-start bg-5484597 bg-contain bg-no-repeat bg-right absolute sm:relative">
            <h1 className="w-[90%] sm:w-[80%] md:w-[65%] lg:w-[55%] font-Lato text-[10vw] sm:text-[8vw] md:text-[8vw] lg:text-[5vw] text-center font-extrabold lg:text-left">
              Explore Blogging
            </h1>
            <div className="w-[90%] sm:w-[80%] md:w-[65%] lg:w-[55%] font-SpaceGrotesk text-[5vw] sm:text-[4vw] md:text-[4vw] lg:text-[2vw] text-center lg:text-left">
              Curious about what a blog is? It's a platform where thoughts,
              stories, and insights come alive. Blogs are a canvas for sharing
              knowledge, experiences, and passions with a global audience.
            </div>
          </div>
        </div>
        <div className="h-screen mt-24 lg:mt-0 w-full">
          <div className="z-50 absolute pt-[28rem] md:pt-[60rem] md:mt-[15rem] lg:pt-0 lg:mr-4 md:mr-0 sm:mr-6 h-full flex flex-col justify-center items-center lg:items-end bg-para3-home bg-contain bg-no-repeat">
            <h1 className="w-[90%] sm:w-[80%] md:w-[65%] lg:w-[55%] font-Lato text-[10vw] sm:text-[8vw] md:text-[7vw] lg:text-[5vw] text-center font-extrabold lg:text-right">
              Dive into Blogging
            </h1>
            <div className="w-[90%] sm:w-[80%] md:w-[65%] lg:w-[55%] font-SpaceGrotesk text-[5vw] sm:text-[4vw] md:text-[4vw] lg:text-[2vw] text-center lg:text-right">
              Ready to dive into the vibrant blogging world? Explore diverse
              topics, connect with like-minded individuals, and discover the
              wealth of inspiring content already waiting for you. Start your
              journey today and see where your curiosity leads!
            </div>

            {authStatus ? (
              <button
                onClick={() => navigate("/all-posts")}
                className="mx-auto md:mx-auto lg:mr-4 mt-6 sm:mr-6"
              >
                <div className="container">
                  <div className="button-home type--C">
                    <div className="button__line"></div>
                    <div className="button__line"></div>
                    <span className="button__text">BLOGS</span>
                    <div className="button__drow1"></div>
                    <div className="button__drow2"></div>
                  </div>
                </div>
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="mx-auto md:mx-auto lg:mr-4 mt-6 sm:mr-6"
              >
                <div className="container">
                  <div className="button-home type--B">
                    <div className="button__line"></div>
                    <div className="button__line"></div>
                    <span className="button__text">LOGIN</span>
                    <div className="button__drow1"></div>
                    <div className="button__drow2"></div>
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>
        {authStatus ? (
          <div className="h-auto w-full my-20 sm:my-40 lg:mt-[40rem]">
            <div className="h-full mx-4 sm:mx-10 mt-[10rem] md:mt-[30rem] lg:mt-0 lg:mx-20 flex flex-col justify-center items-center bg-Friendly-blobs">
              <h1 className="w-full text-center font-Lato font-extrabold text-[8vw] sm:text-[6vw] md:text-[5vw] lg:text-[5vw]">
                Keep Sharing Your Voice with Us
              </h1>
              <div className="w-[95%] sm:w-[85%] md:w-2/3 font-SpaceGrotesk text-[5vw] sm:text-[3.5vw] md:text-[4vw] lg:text-[2vw] text-center">
                You're an integral part of our community, so keep making a
                difference with your unique insights. Continue crafting and
                sharing your blog posts to inspire and engage others with your
                contributions.
              </div>
            </div>
          </div>
        ) : (
          <div className="h-auto w-full my-20 sm:my-40">
            <div className="h-full mx-4 mt-[10rem] md:mt-[30rem] sm:mx-10 lg:mx-20 flex flex-col justify-center items-center bg-Friendly-blobs">
              <h1 className="w-full text-center font-extrabold font-Lato text-[8vw] sm:text-[6vw] md:text-[6vw] lg:text-[5vw]">
                Share Your Voice with the World
              </h1>
              <div className="w-[95%] sm:w-[85%] md:w-2/3 font-SpaceGrotesk text-[5vw] sm:text-[3.5vw] md:text-[4vw] lg:text-[2vw] text-center">
                Eager to contribute your own insights? Sign up or log in and
                start crafting your own blog posts. Join our community and make
                an impact with your unique perspective.
              </div>
              <div className="mt-6 z-50 relative flex flex-col sm:flex-row gap-4 sm:gap-8">
                <button
                  onClick={() => navigate("/login")}
                  className="w-full sm:w-auto"
                >
                  <div className="container">
                    <div className="button-home type--B">
                      <div className="button__line"></div>
                      <div className="button__line"></div>
                      <span className="button__text">LOGIN</span>
                      <div className="button__drow1"></div>
                      <div className="button__drow2"></div>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  className="w-full sm:w-auto"
                >
                  <div className="container">
                    <div className="button-home type--B">
                      <div className="button__line"></div>
                      <div className="button__line"></div>
                      <span className="button__text">SIGN UP</span>
                      <div className="button__drow1"></div>
                      <div className="button__drow2"></div>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

export default Transition(Home);
