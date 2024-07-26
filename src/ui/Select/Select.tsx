'use client'

import {
  ComponentProps,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
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
  label: ReactNode
  color?: string
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
  color,
  onSelectChange,
  defaultSelectValue,
  errorState,
  ...rest
}: SelectProps) {
  const { open, setOpen, active, optionValue, setActive, style, setStyle } =
    useContext(SelectContext) as SelectContextType
  const ref = useRef<any | null>(null)
  const portalRef = useRef<any | null>(null)
  const { height, width } = useWindowDimensions()

  useOnClickOutside(ref, handleClickOutside)

  function handleClickOutside() {
    setOpen(false)
    setStyle({})
  }

  function handleClick() {
    setOpen(!open)
    setStyle({})
  }

  useLayoutEffect(() => {
    if (open && portalRef.current && height && width) {
      const portalRect = portalRef.current.getBoundingClientRect()

      if (portalRect.right > width) {
        setStyle(prev => ({ ...prev, right: `10px` }))
      }

      if (portalRect.bottom > height) {
        setStyle(prev => ({ ...prev, top: `-30px` }))
      }

      if (portalRect.left < 0) {
        setStyle(prev => ({ ...prev, left: `10px` }))
      }

      if (portalRect.top < 0) {
        setStyle(prev => ({ ...prev, top: `10px` }))
      }
    }
  }, [height, width, open, setStyle])

  useEffect(() => {
    if (optionValue !== undefined) {
      onSelectChange && onSelectChange(optionValue)
    }
  }, [onSelectChange, optionValue])

  useEffect(() => {
    setActive(defaultSelectValue)
  }, [defaultSelectValue, setActive])

  return (
    <div ref={ref} {...rest}>
      <div className={styles.select}>
        <div>{label}</div>
        <Button
          variant="clean"
          endIcon={<Icon name="arrowDropDown" height={22} width={22} />}
          onClick={handleClick}
        >
          <span style={{ color: color || 'var(--primary)' }}>{active}</span>
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
  const { setOpen, setActive, setOptionValue, setStyle } = useContext(
    SelectContext
  ) as SelectContextType

  function onClick() {
    setOpen(false)
    setActive(children)
    setOptionValue(value)
    setStyle({})
  }

  return (
    <div className={styles.option} {...rest} onClick={onClick}>
      {children}
    </div>
  )
}
