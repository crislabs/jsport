import { createPortfolioPage0 } from "@/lib/pages/page0/create";
import { portfolioDeletePages0 } from "@/lib/pages/page0/delete";
import { createPortfolioPage1 } from "@/lib/pages/page1/create";
import { portfolioDeletePages1 } from "@/lib/pages/page1/delete";
import { createPortfolioPage2 } from "@/lib/pages/page2/create";
import { portfolioDeletePages2 } from "@/lib/pages/page2/delete";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

import { Error } from "../interfaces/error";
import { CreatePage } from "../interfaces/page";
import { useSelection } from "../providers/SelectionContext";
import { useUI } from "../providers/UIprovider";
import { SwalMessage, SwalMessageError } from "../utils";
import { usePath } from "./usePath";

export const useCreatePage2 = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const queryClient = useQueryClient();
  const path = usePath()

  return useMutation({
    mutationFn: async (input: CreatePage) =>
      await createPortfolioPage2(input),
  
    onSuccess: async (data) => {
      queryClient.invalidateQueries(['portfolio-get-pages2-with-cursor', {first: 256}, path[3]]);
      await SwalMessage(' Page Created');
      toggle();
    },
    onError: async (err: Error) => {
      SwalMessageError(err.response.data.errors[0].message);
    },
  });
}

export const useDeletePage2 = () => {
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
      mutationFn: async (ids: string[]) => await portfolioDeletePages2(ids),
      onSuccess:  (ids) => {
        queryClient.invalidateQueries(['portfolio-get-pages2-with-cursor', {first: 256}, path[3]])
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