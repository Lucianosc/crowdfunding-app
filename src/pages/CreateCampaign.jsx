import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ethers } from 'ethers'
import { useStateContext } from '../context'
import { money } from '../assets'
import { CustomButton, FormField, Loader } from '../components'
import { checkIfImage } from '../utils'

export default function CreateCampaign() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  })
  const { createCampaign } = useStateContext()

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true)
        await createCampaign(form)
        setIsLoading(false)
        navigate('/')
      } else {
        alert('provide valid image URL')
        setForm({ ...form, image: '' })
      }
    })

    console.log(form)
  }

  return (
    <div className="flex flex-col rounded-[10px] sm:p-10 p-4 justify-center items-center bg-[#1c1c24]">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] leading-[38px]">
          Start a Campaign
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-[30px] w-full mt-[65px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="John Example"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField
            labelName="Campaign Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>
        <FormField
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
        />
        <div className="flex w-full p-4 justify-start items-center bg-[#8c6dfd] h-[120px] rounded-[10px]">
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4 className="font-epilogue font-bold text-[24px] ml-[20px]">
            You will get 100% of raised amount
          </h4>
        </div>
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Goal *"
            placeholder="ETH 0.5"
            inputType="number"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField
            labelName="End date *"
            placeholder="End date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>
        <FormField
          labelName="Campaign img *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange('image', e)}
        />
        <div className="flex justify-center items-center mt-[30px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
          ></CustomButton>
        </div>
      </form>
    </div>
  )
}
