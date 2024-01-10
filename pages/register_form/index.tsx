import React, { Fragment } from 'react';
import { RegisterFormComponent } from '@/components/pages/register_form';

function RegisterForm() {
  return <RegisterFormComponent />;
}

RegisterForm.provider = Fragment;

export default RegisterForm;
