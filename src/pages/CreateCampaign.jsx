import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStateContext } from '../context/StateContext'
import { useThemeContext } from '../context/ThemeContext'
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
  const { isDarkTheme } = useThemeContext()

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
    <div
      className={`flex flex-col rounded-[10px] sm:p-10 p-4 justify-center items-center ${
        isDarkTheme ? 'dark' : 'light'
      } bg-[var(--color-background2)] `}
    >
      {isLoading && <Loader />}
      <div
        className={`flex justify-center items-center p-[16px] sm:min-w-[380px]  ${
          isDarkTheme ? 'dark' : 'light'
        } bg-[var(--color-background)] rounded-[10px]`}
      >
        <h1
          className={`font-bold sm:text-[25px] leading-[38px] ${
            isDarkTheme ? 'dark' : 'light'
          } text-[var(--color-text)]`}
        >
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
        <div className={`flex w-full p-4 justify-start items-center bg-[var(--color-tertiary)] h-[120px] rounded-[10px]`}>
          <img
            src={money}
            alt="money"
            className="w-[40px] h-[40px] object-contain"
          />
          <h4
            className={`font-bold text-[24px] text-[var(--color-secondary)] ml-[20px]`}
          >
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
            styles={`${
              isDarkTheme ? 'dark' : 'light'
            } bg-[var(--color-primary)] text-[var(--color-secondary)] `}
          ></CustomButton>
        </div>
      </form>
    </div>
  )
}
