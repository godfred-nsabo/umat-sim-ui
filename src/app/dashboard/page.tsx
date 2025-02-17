"use client";

import {
  //BarChart3,
  ChevronRight,
  //   Cloud,
  //   CreditCard,
  //   Github,
  GraduationCap,
  HelpCircle,
  //Keyboard,
  LayoutDashboard,
  //LifeBuoy,
  LogOut,
  //   Mail,
  //   MessageSquare,
  //   Plus,
  PlusCircle,
  //LogIn,
  // Search,
  //Settings,
  User,
  //   UserPlus,
  //   Users,
  Volume2,
  VolumeX,
  X,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  //DropdownMenuGroup,
  DropdownMenuItem,
  //DropdownMenuLabel,
  //DropdownMenuPortal,
  //DropdownMenuSeparator,
  DropdownMenuShortcut,
  //   DropdownMenuSub,
  //   DropdownMenuSubContent,
  //   DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
//import { Input } from "@/components/ui/input";
// import { Progress } from "@/components/ui/progress"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/layout/sidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "../authGuard";
import { Switch } from "@/components/ui/switch";
import VoiceButton from "@/components/ui/voicebutton";
import EventService from "@/server/actions/event";

import toast, { Toaster } from "react-hot-toast";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DATETIME = process.env.NEXT_PUBLIC_MATRICULATION_DATETIME;

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isModal, setModal] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const router = useRouter();
  const videoUrl = process.env.NEXT_PUBLIC_MATRICULATION_VIDEO_URL;
  const [fullname, setFullname] = useState<string | undefined>("");
  const [firstname, setFirstname] = useState<string | undefined>("");
  const [loading, setLoading] = useState(true);
  const [submitloading, setsubmitLoading] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (!DATETIME) {
      console.error("Target date is not defined in the environment variables.");
      return;
    }

    const targetDate = new Date(DATETIME);

    const currentDate = new Date();

    if (targetDate instanceof Date && currentDate instanceof Date) {
      const timeoutDuration = targetDate.getTime() - currentDate.getTime();
      console.log(timeoutDuration);
      if (currentDate >= targetDate) {
        setShowButton(true);
      } else {
        setTimeout(() => {
          setShowButton(true);
        }, timeoutDuration);
      }
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
      const userData = localStorage.getItem("userData");
      const parsedUserData = JSON.parse(userData ?? "");
      setFullname(parsedUserData?.name);
      setFirstname(parsedUserData?.firstName);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      router.push("/");
    }
  }, [router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    router.push("/");
  };

  const activateModal = async () => {
    setModal(true);
  };

  function handleAgreement() {
    if (isAgreed) {
      setIsAgreed(false);
    } else {
      setIsAgreed(true);
    }
  }

  const oathText = `I do solemnly promise to be a loyal junior member of the
  University of Mines and Technology, to observe the regulations
  of the University, to study diligently, to seek knowledge
  truth and excellence and to promote the good name of the
  University in so far as in me lies, so help me God.`;

  const readAloud = () => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(oathText);
      speech.onstart = () => setIsReading(true);
      speech.onend = () => setIsReading(false);
      speechSynthesis.cancel(); // Cancel any ongoing speech
      speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser doesn't support text-to-speech!");
    }
  };

  const stopReading = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
      setIsReading(false);
    }
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const Register = async () => {
    try {
      setsubmitLoading(true);
      const data = await EventService.Register();

      await delay(2000);
      if (data?.isSuccessful) {
        toast.success(
          "Congrats on matriculating! 🎉 Big things ahead—this is just the beginning! Keep crushing it! 👏🔥",
          {
            duration: 10000, // 10000ms = 10 seconds
          }
        );
      } else {
        toast.error(data?.message);
      }
    } finally {
      setsubmitLoading(false);
    }
  };

  return (
    <AuthGuard>
      <SidebarProvider defaultOpen>
        <Toaster position="top-right" />
        <div className="flex min-h-screen bg-gray-50 w-full">
          {/* Sidebar */}
          <Sidebar className="border-r border-gray-200">
            <SidebarHeader className="border-b px-6 pt-3 h-16">
              <Image
                src="/logo-dark.png"
                alt="Logo"
                width={150}
                height={70}
                className="mr-2"
              />
            </SidebarHeader>
            <SidebarContent className="flex flex-col justify-between h-[calc(100vh-4rem)]">
              <nav className="space-y-6 px-4 py-6">
                <div className="space-y-1">
                  <Link
                    href="#"
                    className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-900"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    <span>Dashboard</span>
                  </Link>
                </div>
              </nav>
              <div className="p-4">
                <Card className=" bg-[#004c23] text-white">
                  <CardContent className="p-4">
                    <HelpCircle className="h-8 w-8 mb-2" />
                    <h3 className="font-semibold mb-1">Dear {firstname},</h3>
                    <p className="text-sm mb-3">
                      Congratulations on your admission to the University of
                      Mines and Technology, Tarkwa
                    </p>
                    <Button
                      variant="secondary"
                      className="w-full bg-white text-teal-500 hover:bg-gray-100"
                    >
                      <Link
                        href="https://umat.edu.gh/students/students-affairs/student-resources"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Freshers Guide
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SidebarContent>
          </Sidebar>

          {/* Main Content */}
          <div className="flex flex-col flex-1 w-full ">
            {/* Fixed Header */}
            <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-8">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Pages</span>
                    <ChevronRight className="h-4 w-4" />
                    <span>Dashboard</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Type here..."
                    className="w-64 pl-8"
                  />
                </div> */}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5 text-neutral-700" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white">
                    {/* <DropdownMenuLabel>Hi {firstname}</DropdownMenuLabel>
                    <DropdownMenuSeparator /> */}
                    {/* <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Keyboard className="mr-2 h-4 w-4" />
                        <span>Keyboard shortcuts</span>
                        <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        <span>Team</span>
                      </DropdownMenuItem>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          <UserPlus className="mr-2 h-4 w-4" />
                          <span>Invite users</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              <span>Email</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              <span>Message</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <PlusCircle className="mr-2 h-4 w-4" />
                              <span>More...</span>
                            </DropdownMenuItem>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                      <DropdownMenuItem>
                        <Plus className="mr-2 h-4 w-4" />
                        <span>New Team</span>
                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Github className="mr-2 h-4 w-4" />
                      <span>GitHub</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LifeBuoy className="mr-2 h-4 w-4" />
                      <span>Support</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                      <Cloud className="mr-2 h-4 w-4" />
                      <span>API</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator /> */}
                    <DropdownMenuItem
                      onClick={logout}
                      className="mouse cursor-pointer hover:scale-105 hover:bg-[#FAFBFC] transition-all text-neutral-700"
                    >
                      <LogOut className="mr-2 h-4 w-4 " />
                      <span>Log out</span>
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button> */}
              </div>
            </header>

            {/* Scrollable Content */}
            <main className="flex-1 overflow-auto p-8">
              {/* Projects Table */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-neutral-700">
                    23th Matriculation Ceremony
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-300">
                  <div>
                    {loading ? (
                      [...Array(10)].map((_, index) => (
                        <div
                          key={index}
                          className="skeleton-loader"
                          style={{ marginBottom: "10px" }}
                        >
                          <Skeleton
                            height={30}
                            width="100%"
                            className="rounded-lg"
                          />
                        </div>
                      ))
                    ) : (
                      <iframe
                        width="100%"
                        height={500}
                        src={videoUrl}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    )}
                  </div>
                  {showButton ? (
                    <Button
                      onClick={activateModal}
                      className="w-full bg-[#004c23] text-white mt-5 hover:bg-[#357d5b]"
                    >
                      Read and Agree to Matriculation Oath
                    </Button>
                  ) : (
                    <p className="text-red-500 p-5 text-center text-bold">
                      **Please remain present for the ceremony as attendance
                      will be taken afterward
                    </p>
                  )}
                </CardContent>
              </Card>
            </main>
          </div>
        </div>

        {isModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4">
            <div className="w-full max-w-[600px] rounded-lg bg-white">
              <div className="p-6">
                <div className="flex flex-row items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50">
                    <GraduationCap className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-neutral-700">
                      Matriculation Oath by {fullname}
                    </h2>
                  </div>
                  <button
                    onClick={() => setModal(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </button>
                </div>
                <p className="pb-5 border-b mb-5 p-5 text-neutral-700">
                  I do solemnly promise to be a loyal junior member of the
                  University of Mines and Technology, to observe the regulations
                  of the University, to study diligently, to seek knowledge
                  truth and excellence and to promote the good name of the
                  University in so far as in me lies, so help me God.
                </p>

                <div className="flex justify-center  mb-5">
                  <VoiceButton onClick={isReading ? stopReading : readAloud}>
                    {isReading ? (
                      <div className="flex justify-start gap-2">
                        <VolumeX className="h-4 w-4" />
                        <span>Stop Reading</span>
                      </div>
                    ) : (
                      <div className="flex justify-center gap-2">
                        <Volume2 className="h-4 w-4" />
                        Read Aloud
                      </div>
                    )}
                  </VoiceButton>
                </div>

                <div>
                  <div className="mb-5 flex items-center space-x-2">
                    <Switch
                      id="declare"
                      checked={isAgreed}
                      onCheckedChange={handleAgreement}
                      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ${
                        isAgreed ? "bg-green-500" : "bg-gray-200"
                      } `}
                    />
                    <label htmlFor="" className="text-neutral-700">
                      I agree to have fully participated in the matriculation
                      ceremony
                    </label>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setModal(false)}
                    className="rounded-md bg-red-50 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-100"
                  >
                    <span className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Cancel</span>
                    </span>
                  </button>
                  {isAgreed && (
                    <button
                      type="submit"
                      className="rounded-md bg-green-50 px-4 py-2 text-sm font-medium text-green-500 hover:bg-green-100"
                      disabled={submitloading}
                    >
                      <span
                        className="flex items-center gap-2"
                        onClick={Register}
                      >
                        {submitloading ? (
                          <>
                            <span>Syncing data</span>{" "}
                            <div className="border-4 border-t-4 border-gray-300 border-t-[#3498db] rounded-full w-5 h-5 animate-spin mr-2"></div>
                          </>
                        ) : null}
                        {!submitloading && (
                          <>
                            <PlusCircle className="h-4 w-4 text-emerald-500" />
                            <span className="text-sm">Submit Attendance </span>
                          </>
                        )}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </SidebarProvider>
    </AuthGuard>
  );
}
