import React from 'react'
import { Button } from 'semantic-ui-react'

export interface HelloProps { compiler: string; framework: string }

export const Hello = (props: HelloProps) =>
    <>
    <h1>Hello from {props.compiler} and {props.framework}!</h1>
        <Button>Click Here</Button>
    </>
