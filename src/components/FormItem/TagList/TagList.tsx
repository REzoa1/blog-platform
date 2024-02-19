import { Button, Form, Input, Space } from 'antd'
import React from 'react'

import { cn } from '../../../utils/helpers'

import styles from './TagList.module.scss'

function TagList() {
  return (
    <Form.List name="tagList">
      {(fields, { add, remove }) =>
        fields.length === 0 ? (
          <Button className={cn(styles.btn, styles.addBtn)} type="dashed" onClick={() => add()}>
            Add tag
          </Button>
        ) : (
          fields.map(({ key, name }, index) => (
            <Space className={styles.space} key={key} align="baseline" wrap>
              <Form.Item name={[name]}>
                <Input className={styles.input} placeholder="Tag" autoFocus />
              </Form.Item>
              <Button className={styles.btn} danger onClick={() => remove(name)}>
                Delete
              </Button>

              {index === fields.length - 1 && (
                <Button className={cn(styles.btn, styles.addBtn)} type="dashed" onClick={() => add()}>
                  Add tag
                </Button>
              )}
            </Space>
          ))
        )
      }
    </Form.List>
  )
}

export default TagList
