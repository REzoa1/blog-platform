import React, { useEffect } from 'react'
import { Form } from 'antd'

import FormWrapper from '../../components/FormWrapper/FormWrapper'
import { useAppSelector } from '../../store'
import { selectAuth } from '../../store/slices/auth'

function Profile() {
  const { userdata } = useAppSelector(selectAuth)

  const [form] = Form.useForm()

  useEffect(() => {
    if (userdata) {
      const { username, email, image } = userdata
      form.setFieldsValue({ username, email, image })
    }
  }, [userdata, form])

  return <div className="wrapper">{userdata && <FormWrapper name="profile" form={form} />}</div>
}

export default Profile
