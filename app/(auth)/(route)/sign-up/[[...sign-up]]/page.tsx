import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <SignUp
    appearance={{
      elements: {
        formButtonPrimary: 'hover:bg-blue-600 rounded-2xl transition-color text-slate-100 text-sm normal-case',

      },
      variables: {
        colorPrimary: "rgb(37 99 235 / 0.9)"
      }
    }}
  />;
}