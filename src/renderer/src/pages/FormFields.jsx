import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Datepicker from 'react-tailwindcss-datepicker'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { formatLabel } from './utils'

export const renderField = (
  field,
  formData,
  handleChange,
  handleSelectChange,
  handleDateChange,
  customInputs
) => {
  if (field === 'id') return null

  if (['dateOfBirth', 'dateOfAdmission', 'dateOfLeaving'].includes(field)) {
    return (
      <>
        <Label htmlFor={field}>{formatLabel(field)}</Label>
        <Datepicker
          asSingle={true}
          useRange={false}
          value={{ startDate: formData[field], endDate: formData[field] }}
          onChange={(value) => handleDateChange(field, value)}
          displayFormat="YYYY-MM-DD"
          placeholder={`Select ${formatLabel(field)}`}
          inputClassName="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </>
    )
  }

  if (['progress', 'conduct', 'remarks', 'reasonOfLeaving'].includes(field)) {
    const options = {
      progress: ['Excellent', 'Good', 'Average', 'Needs Improvement'],
      conduct: ['Excellent', 'Good', 'Satisfactory', 'Needs Improvement'],
      remarks: ['Outstanding', 'Satisfactory', 'Needs Attention'],
      reasonOfLeaving: ['Completed Studies', 'Transfer', 'Personal Reasons', 'Other']
    }

    return (
      <>
        <Label htmlFor={field}>{formatLabel(field)}</Label>
        <div className="flex flex-col space-y-2">
          <Select
            onValueChange={(value) => handleSelectChange(field, value)}
            value={customInputs[field] ? 'custom' : formData[field]}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Select ${formatLabel(field)}`} />
            </SelectTrigger>
            <SelectContent>
              {options[field].map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
          {customInputs[field] && (
            <Input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter custom ${formatLabel(field)}`}
            />
          )}
        </div>
      </>
    )
  }

  return (
    <>
      <Label htmlFor={field}>{formatLabel(field)}</Label>
      <Input
        type={field === 'certGenCount' ? 'number' : 'text'}
        id={field}
        name={field}
        value={formData[field]}
        onChange={handleChange}
        placeholder={formatLabel(field)}
        required
        min={field === 'certGenCount' ? '0' : undefined}
      />
    </>
  )
}
