import * as React from 'react'
import styles from './styles.module.less'
import Button from 'antd/es/button'

interface Props {
  text: string
}

export const ExampleComponent = ({ text }: Props) => {
  return (
    <div className={styles.test}>
      Example Component: <Button>Demo button</Button>
      {text}
    </div>
  )
}