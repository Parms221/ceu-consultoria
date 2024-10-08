import { cn } from "@/lib/utils";

export default function GoogleMeetIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn(
        "w-6 h-6",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 48 48"
    >
      <rect
        width="16"
        height="16"
        x="12"
        y="16"
        fill="#fff"
        transform="rotate(-90 20 24)"
      ></rect>
      <polygon
        fill="#1e88e5"
        points="3,17 3,31 8,32 13,31 13,17 8,16"
      ></polygon>
      <path
        fill="#4caf50"
        d="M37,24v14c0,1.657-1.343,3-3,3H13l-1-5l1-5h14v-7l5-1L37,24z"
      ></path>
      <path
        fill="#fbc02d"
        d="M37,10v14H27v-7H13l-1-5l1-5h21C35.657,7,37,8.343,37,10z"
      ></path>
      <path fill="#1565c0" d="M13,31v10H6c-1.657,0-3-1.343-3-3v-7H13z"></path>
      <polygon fill="#e53935" points="13,7 13,17 3,17"></polygon>
      <polygon fill="#2e7d32" points="38,24 37,32.45 27,24 37,15.55"></polygon>
      <path
        fill="#4caf50"
        d="M46,10.11v27.78c0,0.84-0.98,1.31-1.63,0.78L37,32.45v-16.9l7.37-6.22C45.02,8.8,46,9.27,46,10.11z"
      ></path>
    </svg>
  );
}
