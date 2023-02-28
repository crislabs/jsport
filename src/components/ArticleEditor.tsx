'use client'
import { getPortfolioArticle } from '@/lib/articles/read'
import { Article } from '@/interfaces/article'
import { useQuery } from '@tanstack/react-query'
import { HeadingDashboard } from './HeadingDashboard'
import MarkdownEditor from './MarkdownEditor'
import { useGetArticle } from '@/hooks/useArticles1'
// import Modal from './Modal'

interface Props {
  id: string
}

export default function ArticleEditor(props: Props) {
  const { data: article } = useGetArticle(props.id)
  return (
    <>
      <div className='mb-6'>
        <HeadingDashboard title={article?.data.name} article={article} />
      </div>
      <MarkdownEditor markdown={article?.data.content as string} id={props.id} />
      {/* <Modal /> */}
    </>
  )
}
