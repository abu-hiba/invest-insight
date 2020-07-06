import { ReactNode } from "react"
import CSS from 'csstype'

export interface BasicContainer {
    children: ReactNode,
    style?: CSS.Properties
}