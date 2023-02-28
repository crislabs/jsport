import { useRouter } from "next/router"

export const usePath = () => {
  const { asPath } = useRouter()
  asPath!.toString();
  return asPath!.slice(1).split('/');
}