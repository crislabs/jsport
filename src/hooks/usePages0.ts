import { createPortfolioPage0 } from "@/lib/pages/page0/create";
import { portfolioDeletePages0 } from "@/lib/pages/page0/delete";
import { getPortfolioPage0, getPortfolioPage0BySlug, getPortfolioPages0WithCursor } from "@/lib/pages/page0/read";
import { updatePortfolioPage0 } from "@/lib/pages/page0/update";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

import { Error } from "../interfaces/error";
import { CreatePage, ListPage, Page, UpdatePage } from "../interfaces/page";
import { useSelection } from "../providers/SelectionContext";
import { useUI } from "../providers/UIprovider";
import { SwalMessage, SwalMessageError } from "../utils";

export const useCreatePage0 = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreatePage) =>
      await createPortfolioPage0(input),
  
    onSuccess: async (data) => {
      queryClient.invalidateQueries(['portfolio-get-pages0-with-cursor', {first: 256}, process.env.NEXT_PUBLIC_SITE_URL as string]);
      await SwalMessage(' Page Created');
      toggle();
    },
    onError: async (err: Error) => {
      SwalMessageError(err.response.data.errors[0].message);
    },
  });
}
export const useUpdatePage0 = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdatePage) =>
      await updatePortfolioPage0(input),
  
    onSuccess: async (data) => {
      queryClient.setQueryData<Page>(['portfolio-get-page0', data._id], data);
      await SwalMessage('Page Updated');
      toggle();
    },
    onError: async (err: Error) => {
      SwalMessageError(err.response.data.errors[0].message);
    },
  });
}

export const useGetPage0 = (id: string) => {
  return useQuery<Page>({
    queryKey: ['portfolio-get-page0', id],
    queryFn: () => getPortfolioPage0( id )
  });
}
export const useGetPage0BySlug = (slug: string) => {
  return useQuery<Page>({
    queryKey: ['portfolio-get-page0-by-slug', slug],
    queryFn: () => getPortfolioPage0BySlug( slug, process.env.NEXT_PUBLIC_SITE_URL as string)
  });
}

export const useGetPage0WithCursor = () => {
  return useQuery<ListPage>({
    queryKey: ['portfolio-get-pages0-with-cursor', {first: 256}, process.env.NEXT_PUBLIC_SITE_URL as string],
    queryFn: () => getPortfolioPages0WithCursor( {first: 256}, process.env.NEXT_PUBLIC_SITE_URL as string),
  });
}

export const useDeletePage0 = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const { unSelectAll } = useSelection();

  const queryClient = useQueryClient();
  return useMutation(
    {
      mutationFn: async (ids: string[]) => await portfolioDeletePages0(ids),
      onSuccess:  (ids) => {
        queryClient.invalidateQueries(['portfolio-get-pages0-with-cursor', {first: 256}, process.env.NEXT_PUBLIC_SITE_URL as string])
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