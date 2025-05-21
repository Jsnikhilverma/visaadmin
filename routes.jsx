import { HomeIcon,  UserIcon, } from "@heroicons/react/24/solid";
import Home from "./src/pages/dashboard/home"; // Fixed path
import PrivateRoute from "@/components/PrivateRoute";
// import ExpertSignupForm from "@/pages/dashboard/expert/createexpert"
import Allexperts from "@/pages/dashboard/expert/allexperts"
import Audiobooks from "@/pages/dashboard/audio/Audiobooks";
import VideoBooks from "@/pages/dashboard/video/VideoBook";
import { AudioLinesIcon, VideoIcon } from "lucide-react";
import Users from "@/pages/dashboard/users/users";
import FreeAudiobooks from "@/pages/dashboard/audioFree/FreeAudiobooks";
// import CreateTestimonial from "@/pages/dashboard/testimonials/CreateTestimonial";
import AudioPackage from "@/pages/dashboard/audioPackage/AudioPackage";
import CoverLetterForm from "@/pages/dashboard/tamplates/CoverLetter"
import NOCForm from "@/pages/dashboard/tamplates/noc"
import SponsorshipLetterForm from "@/pages/dashboard/tamplates/SponsorshipLetter"
import Documents from "@/pages/dashboard/documents/Documents";

const iconClass = "w-5 h-5 text-inherit";

export const routes = [
  {
    layout: "dashboard",

    pages: [
      {
        icon: <HomeIcon className={iconClass} />,
        name: "Dashboard",
        path: "/home", // Fixed path
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },

      {
        icon: <UserIcon className={iconClass} />,
        name: "All Users",
        path: "/all-users", // Fixed path
        element: (
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        ),
      },
      {
        icon: <AudioLinesIcon className={iconClass} />,
        name: "All Kycs",
        path: "/all-Kycs", // Fixed path
        element: (
          <PrivateRoute>
            <Audiobooks />
          </PrivateRoute>
        ),
      },
      
      {
        icon: <AudioLinesIcon className={iconClass} />,
        name: "Apply Passports",
        path: "/apply-passports", // Fixed path
        element: (
          <PrivateRoute>
            <AudioPackage/>
          </PrivateRoute>
        ),
      },
      {
        icon: <AudioLinesIcon className={iconClass} />,
        name: "Passport",
        path: "/passport", // Fixed path
        element: (
          <PrivateRoute>
            <FreeAudiobooks/>
          </PrivateRoute>
        ),
      },
      {
        icon: <VideoIcon className={iconClass} />,
        name: "Apply Visa",
        path: "/apply-visa", // Fixed path
        element: (
          <PrivateRoute>
            <VideoBooks />
          </PrivateRoute>
        ),
      },

      {
        icon: <UserIcon className={iconClass} />,
        name: "Add Experts",
        path: "/allexperts", // Fixed path
        element: (
          <PrivateRoute>
            <Allexperts />
          </PrivateRoute>
        ),
      },
      // {
      //   icon: <QuestionMarkCircleIcon className={iconClass} />,
      //   name: "Create Testimonial",
      //   path: "/create-testimonial", // Fixed path
      //   element: (
      //     <PrivateRoute>
      //       <CreateTestimonial/>
      //     </PrivateRoute>
      //   ),
      // },
      {
        icon: <HomeIcon className={iconClass} />,
        name: "Cover Letter",
        path: "/Coverletter", // Fixed path
        element: (
          <PrivateRoute>
            <CoverLetterForm />
          </PrivateRoute>
        ),
      },
        {
        icon: <HomeIcon className={iconClass} />,
        name: "NOC",
        path: "/nocForm", // Fixed path
        element: (
          <PrivateRoute>
            <NOCForm />
          </PrivateRoute>
        ),
      },
        {
        icon: <HomeIcon className={iconClass} />,
        name: "Documents",
        path: "/documents", // Fixed path
        element: (
          <PrivateRoute>
            <Documents />
          </PrivateRoute>
        ),
      },
         {
        icon: <HomeIcon className={iconClass} />,
        name: "Sponsorship Letter",
        path: "/SponsorshipLetter", // Fixed path
        element: (
          <PrivateRoute>
            <SponsorshipLetterForm  />
          </PrivateRoute>
        ),
      },



      // {
      //   icon: <UserCheck2Icon className={iconClass} />,
      //   name: "All Vendors",
      //   path: "/all-vendors", // Fixed path
      //   element: (
      //     <PrivateRoute>
      //       <Vendors />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   icon: <ImageUpIcon className={iconClass} />,
      //   name: "Create Banner",
      //   path: "/creare-banner", // Fixed path
      //   element: (
      //     <PrivateRoute>
      //       <BannerManager />
      //     </PrivateRoute>
      //   ),
      // },
    ],
  },
];

export default routes;
