'use client'

import React, { SyntheticEvent } from 'react'

type Context = {
  expanded: boolean | undefined
  toggle: (e: SyntheticEvent) => void
}

const context = { expanded: false, toggle: () => {} }
export const AccordionContext = React.createContext<Context>(context)
