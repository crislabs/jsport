
import { Dialog } from '@headlessui/react';
import {  XMarkIcon } from '@heroicons/react/24/outline';
// import { usePath } from '@/src/hooks/usePath';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';


import { usePath } from '@/hooks/usePath';
import { useUI } from '@/providers/UIprovider';
import { useCreateArticle1, useCreateArticle2, useUpdateArticle } from '@/hooks/useArticles1';
import { Article, CreateArticle, UpdateArticle } from '@/interfaces/article';
// import { usePetCreateArticle, usePetUpdateArticle } from '@/src/hooks/articles';

interface Props {
  article?: Article;
}

interface FormValues {
  name: string;
  description: string;
  type: string;
}

export function FormArticle(props: Props) {
  const { article } = props;
  // const { data: session } = useSession();
  const path = usePath();
  const { toggleSlideOversForm } = useUI();
  const createArticle1 = useCreateArticle1();
  const createArticle2 = useCreateArticle2();
  const updateArticle = useUpdateArticle();
  
  //toggleSlideOversForm.actions.setLeft
  // const createUser = useCreatePage0();
  // const updatePetArticle = usePetUpdateArticle();

  return (
    <Formik
      initialValues={
        article
          ? {
              id: article?._id as string,
              name: article.data.name,
              description: article.data.description,
              siteId: process.env.NEXT_PUBLIC_SITE_URL as string,
              parentId: article.parentId,
              uid: '123'
              // uid: (session?.user.sid as string) || '123456789',
            }
          : {
              name: '',
              description: 'Article description',
              uid: '123',
              // uid: (session?.user.sid as string) || '123456789',
              siteId: process.env.NEXT_PUBLIC_SITE_URL as string,
              parentId: path[3],
            }
      }
      onSubmit={(values) => {

        // createUser.mutate(values as CreateArticle)
        // console.log('values', values)

        if (article) {
          updateArticle.mutate(values as UpdateArticle);
        } else {
          if (path[2]==='page0') {
            // console.log('values', values)
            createArticle1.mutate(values as CreateArticle);
          }
          if (path[2]==='page1') {
            // console.log('values', values)
            createArticle2.mutate(values as CreateArticle);
          }

        }
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(100, 'Debe tener 100 caracteres como maximo')
          .required('Required'),
      })}
    >
      <Form
        // onSubmit={handleSubmit}
        className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
      >
        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
          <div className="flex items-start justify-between">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              {article ? 'Edit Article' : 'New Article'}
            </Dialog.Title>
            <div className="ml-3 flex h-7 items-center">
              <button
                type="button"
                className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                onClick={toggleSlideOversForm.actions.setLeft}
              >
                <span className="sr-only">Close panel</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="mt-8">
            <div className="flow-root">
              <div>
                <div className="sm:rounded-md">
                  <div className="bg-white">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6">
                        <label className="label-form">Name</label>
                        <Field name="name" type="text" className="input-form" autoComplete="off" />
                        <ErrorMessage name="name" />
                      </div>

                      <div className="col-span-6">
                        <label className="label-form">Description</label>
                        <div className="mt-1">
                          <Field
                            className="input-form"
                            component="textarea"
                            rows="10"
                            name="description"
                          />
                          <ErrorMessage name="description" />
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" border-t border-gray-200 p-3 bg-gray-200">
          <div className="group-button-form ">
            <button type="submit" className="btn-primary ">
              
              {article
                ? updateArticle.isLoading
                  ? '...Updating'
                  : 'Update'
                : (createArticle1.isLoading || createArticle2.isLoading)
                ? '...Saving'
                : 'Save'}
            </button>
            <button
              type="button"
              className="btn-default"
              onClick={toggleSlideOversForm.actions.setLeft}
            >
              Cancel
            </button>
          </div>
        </div>
      </Form>
    </Formik>
  );
}
