import React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const predefinedOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
]

const ComboboxWithCustomInput = ({ onValueChange }) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')

  const handleSelect = (currentValue) => {
    if (currentValue === value) {
      setValue('')
      onValueChange('')
    } else {
      setValue(currentValue)
      onValueChange(currentValue)
    }
    setOpen(false)
  }

  const handleCustomInput = (inputValue) => {
    setValue(inputValue)
    onValueChange(inputValue)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? predefinedOptions.find((option) => option.value === value)?.label || value
            : 'Select or enter...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search or enter custom value..."
            onValueChange={handleCustomInput}
          />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup>
            {predefinedOptions.map((option) => (
              <CommandItem key={option.value} value={option.value} onSelect={handleSelect}>
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === option.value ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ComboboxWithCustomInput
