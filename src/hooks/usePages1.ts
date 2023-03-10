import { createPortfolioPage0 } from "@/lib/pages/page0/create";
import { portfolioDeletePages0 } from "@/lib/pages/page0/delete";
import { createPortfolioPage1 } from "@/lib/pages/page1/create";
import { portfolioDeletePages1 } from "@/lib/pages/page1/delete";
import { getPortfolioGetPages1WithCursor } from "@/lib/pages/page1/read";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

import { Error } from "../interfaces/error";
import { CreatePage, ListPage } from "../interfaces/page";
import { useSelection } from "../providers/SelectionContext";
import { useUI } from "../providers/UIprovider";
import { SwalMessage, SwalMessageError } from "../utils";
import { usePath } from "./usePath";

export const useCreatePage1 = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const queryClient = useQueryClient();
  const path = usePath()
  return useMutation({
    mutationFn: async (input: CreatePage) =>
      await createPortfolioPage1(input),
  
    onSuccess: async (data) => {
      queryClient.invalidateQueries(['portfolio-get-pages1-with-cursor', {first: 256}, path[3]]);
      await SwalMessage(' Page Created');
      toggle();
    },
    onError: async (err: Error) => {
      SwalMessageError(err.response.data.errors[0].message);
    },
  });
}

export const useDeletePage1 = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const { unSelectAll } = useSelection();
  const path = usePath()
  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: async (ids: string[]) => await portfolioDeletePages1(ids),
      onSuccess:  (ids) => {
        queryClient.invalidateQueries(['portfolio-get-pages1-with-cursor', {first: 256}, path[3]])
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false,
        })
        unSelectAll()
      },
      onError: (error: Error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.errors[0].message,
          footer: '<a href="">Why do I have this issue?</a>',
        });
      },
    }
  );
}

export const useGetPage1WithCursor = (id: string) => {
  return useQuery<ListPage>({
    queryKey: ['portfolio-get-pages1-with-cursor', {first: 256}, id],
    queryFn: () => getPortfolioGetPages1WithCursor( {first: 256}, id),
  });
}