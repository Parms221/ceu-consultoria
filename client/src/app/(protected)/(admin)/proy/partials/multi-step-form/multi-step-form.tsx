'use client'

import { useState } from "react";

const steps = [
    {id:"step-1", name: "Diagnóstico"},
    {id:"step-2", name:"Alcance"},
    { id: "step-3", name: "Cronograma" },
    { id: "step-4", name: "Asignación" }
];

export default function MultiStepForm(){
    const [currentStep, setCurrentStep] = useState(2);

    const next = () => {
        if(currentStep < steps.length -1){
            setCurrentStep(step => step+1);
        }
    };

    const prev = () => {
        if(currentStep>0){
            setCurrentStep(step => step-1);
        }
    };

    return (
        <>
            <section className="flex flex-col justify-between p-24">
                <nav>
                    <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
                        {steps.map((step, index) => {
                            if(currentStep > index)
                                return (
                                    <li key={step.id} className="flex md:w-full items-center text-blue-400 dark:text-blue-700 after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                                        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                            </svg>
                                            {step.name}
                                        </span>
                                    </li>
                                );
                            
                            if(currentStep === index){
                                return (
                                    <li key={step.id} className="flex md:w-full items-center text-white dark:text-blue-500 font-bold sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                                        <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500 py-0.5 px-3 bg-blue-700 rounded-md">
                                            <span className="me-2 font-extrabold">{index + 1}</span>
                                            {step.name}
                                        </span>
                                    </li>
                                );
                            }

                            return (
                                <li key={step.id} className="flex md:w-full items-center font-bold sm:after:content-[''] after:w-full after:h-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
                                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                                        <span className="me-2">{index + 1}</span>
                                        {step.name}
                                    </span>
                                </li>
                            );
                        }
                            
                        )}
                    </ol>

                </nav>
            </section>

            {/* <section className="flex flex-col justify-between p-24">
                <form className="mt-12 py-12">
                    {currentStep === 0 && (

                    )}
                </form>
            </section> */}

            <div className="mt-8 pt-5">
                <div className="flex justify-between">
                    <button 
                        type="button" 
                        onClick={prev} 
                        disabled={currentStep === 0}
                        className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50">
                        
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='h-6 w-6'
                        >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M15.75 19.5L8.25 12l7.5-7.5'
                        />
                        </svg>
                    </button>
                    <button
                        type='button'
                        onClick={next}
                        disabled={currentStep === steps.length - 1}
                        className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'>
                        
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='h-6 w-6'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M8.25 4.5l7.5 7.5-7.5 7.5'
                            />
                        </svg>

                    </button>
                </div>
            </div>
        </>
        
        
                        
    );

}