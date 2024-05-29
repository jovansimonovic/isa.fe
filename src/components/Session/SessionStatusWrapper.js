import { useSession } from "next-auth/react";
import { Spinner } from "reactstrap";

export default function SessionStatusWrapper({ children }) {
  const { data: session, status } = useSession();

  return <>{status === "loading" ? <Spinner /> : <>{children}</>}</>;
}
