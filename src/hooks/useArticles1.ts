
import { createPortfolioArticle } from "@/lib/articles/create";
import { getPortfolioArticle, getPortfolioArticlesWithCursorByParentId } from "@/lib/articles/read";
import { updatePortfolioArticle, updatePortfolioArticleContent } from "@/lib/articles/update";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Article, CreateArticle, ListArticle, UpdateArticle, UpdateContentArticle } from "../interfaces/article";
import { Error } from "../interfaces/error";
import { useUI } from "../providers/UIprovider";
import { SwalMessage, SwalMessageError, SwalMessageSiteCreateError, SwalMessageTime } from "../utils";

export const useCreateArticle1 = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateArticle) => await createPortfolioArticle(input),

    onSuccess: async (data) => {
      queryClient.invalidateQueries([
        'portfolio-get-articles1-with-cursor',
        { first: 256 },
        data.parentId,
      ]);

      await SwalMessage('Article Created');
      toggle();
    },
    onError: async (err: Error) => {
      SwalMessageError(err.response.data.errors[0].message);
    },
  });
}
export const useCreateArticle2 = () => {
  const {
    toggleSlideOversForm: {
      actions: { toggle },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateArticle) => await createPortfolioArticle(input),

    onSuccess: async (data) => {
      queryClient.invalidateQueries([
        'portfolio-get-articles2-with-cursor',
        { first: 256 },
        data.parentId,
      ]);

      await SwalMessage('Article Created');
      toggle();
    },
    onError: async (err: Error) => {
      SwalMessageError(err.response.data.errors[0].message);
    },
  });
}

export const useUpdateArticle = () => {
  const {
    toggleSlideOversForm: {
      value,
      actions: { toggle, setLeft },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateArticle) => await updatePortfolioArticle(input),

    onSuccess: async (data) => {
      queryClient.setQueryData<Article>(['portfolio-get-article', data._id], data);
      queryClient.setQueryData<Article>(['article', data.slug], data);
      await SwalMessageTime('Article Updated', 2000);
      toggle();
    },
    onError: async (err: Error) => {
      SwalMessageError(err.response.data.errors[0].message);
    },
  });
}
export const useGetArticle = (id: string) => {
  return useQuery<Article>({
    queryKey: ['get-article', id],
    queryFn: () => getPortfolioArticle( id )
  });
} 

export const useGetArticles = (id: string) => {
  return useQuery<ListArticle>({
    queryKey: ['portfolio-get-articles1-with-cursor', {first: 256}, id],
    queryFn: () => getPortfolioArticlesWithCursorByParentId( {first: 256}, id),
    
  });
}
export const useUpdateArticleContent = () => {
  const {
    toggleSlideOversForm: {
      value,
      actions: { toggle, setLeft },
    },
  } = useUI();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateContentArticle) => await updatePortfolioArticleContent(input),

    onSuccess: async (data) => {
      queryClient.setQueryData<Article>(['portfolio-get-article', data._id], data);
      await SwalMessageTime('Content Updated', 2000);

      // toggle();
    },
    onError: async (err: Error) => {
      SwalMessageError(err.response.data.errors[0].message);
    },
  });
}