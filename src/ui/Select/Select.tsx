'use client'

import {
  ComponentProps,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { FieldError } from 'react-hook-form'
import { useOnClickOutside, useWindowDimensions } from '@/hooks'
import { Button } from '../Button/Button'
import { FormFieldErrors } from '../Form'
import { Icon } from '../Icon/Icon'
import styles from './Select.module.css'
import { SelectContext, SelectContextType, SelectProvider } from './context'

type SelectProps = ComponentProps<'div'> & {
  label: string
  children: ReactNode
  onSelectChange: Function
  defaultSelectValue: any
  errorState?: FieldError
}

export function Select(props: SelectProps) {
  return (
    <SelectProvider>
      <SelectWithContext {...props} />
    </SelectProvider>
  )
}

export function SelectWithContext({
  children,
  label,
  onSelectChange,
  defaultSelectValue,
  errorState,
  ...rest
}: SelectProps) {
  const { open, setOpen, active, optionValue, setActive } = useContext(
    SelectContext
  ) as SelectContextType
  const ref = useRef<any | null>(null)
  const portalRef = useRef<any | null>(null)
  const { height, width } = useWindowDimensions()
  const [style, setStyle] = useState({})

  useOnClickOutside(ref, () => setOpen(false))

  useEffect(() => {
    if (open && portalRef.current && height && width) {
      const portalRect = portalRef.current.getBoundingClientRect()

      if (portalRect.right > width) {
        setStyle(prev => ({ ...prev, right: `10px` }))
      }

      if (portalRect.bottom > height) {
        setStyle(prev => ({ ...prev, bottom: `10px` }))
      }

      if (portalRect.left < 0) {
        setStyle(prev => ({ ...prev, left: `10px` }))
      }

      if (portalRect.top < 0) {
        setStyle(prev => ({ ...prev, top: `10px` }))
      }
    }
  }, [height, width, style, open])

  useEffect(() => {
    if (optionValue !== undefined) {
      onSelectChange && onSelectChange(optionValue)
    }
  }, [optionValue])

  useEffect(() => {
    setActive(defaultSelectValue)
  }, [])

  return (
    <div ref={ref} {...rest}>
      <div className={styles.select}>
        <div>{label}</div>
        <Button
          variant="clean"
          endIcon={<Icon name="arrowDropDown" height={22} width={22} />}
          onClick={() => setOpen(!open)}
        >
          {active}
        </Button>
      </div>

      {open &&
        createPortal(
          <div ref={portalRef} className={styles.options} style={style}>
            {children}
          </div>,
          ref.current
        )}

      {errorState?.message ? <FormFieldErrors error={errorState} /> : null}
    </div>
  )
}

type SelectOptionProps = ComponentProps<'div'> & {
  value: any
  children: ReactNode
}

export function SelectOption({ value, children, ...rest }: SelectOptionProps) {
  const { setOpen, setActive, setOptionValue } = useContext(
    SelectContext
  ) as SelectContextType

  function onClick() {
    setOpen(false)
    setActive(children)
    setOptionValue(value)
  }

  return (
    <div className={styles.option} {...rest} onClick={onClick}>
      {children}
    </div>
  )
}
