import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

export const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div className="form-group">
    <label htmlFor={label}>{label}</label>
    <input className="form-control" {...input} placeholder={label} type={type}/>
    <p className="text-danger">{touched && (error && <span>{error}</span>)}</p>
  </div>
)

export const renderTextAreaField = ({ input, label, type, meta: { touched, error } }) => (
  <div className="form-group">
    <label htmlFor={label}>{label}</label>
    <textarea className="form-control" {...input} placeholder={label} type={type} rows="10"/>
    <p className="text-danger">{touched && (error && <span>{error}</span>)}</p>
  </div>
)

export const renderSelectField = ({ input, label, options,  meta: { touched, error } }) => {
  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      <Select
        name={input.name}
        value={input.value}
        onChange={input.onChange}
        onBlur={() => input.onBlur(input.value)}
        options={options}
        placeholder="Select"
        simpleValue
        clearable={false}
      />
      <p className="text-danger">{touched && (error && <span>{error}</span>)}</p>
    </div>
  )
}

export const renderSelectMultiField = ({ input, label, options, meta: { touched, error } }) => {
  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      <Select
        {...input}
        onBlur={() => input.onBlur([...input.value].map(x => (x.value)))}
        options={options}
        multi
      />
      <p className="text-danger">{touched && (error && <span>{error}</span>)}</p>
    </div>
  )
}

      backspaceRemoves: props.backspaceRemoves || true,
      multi: props.multi || false,
      minchar: props.minchar || 3,
      creatable: props.creatable || false,
      label: props.label || 'Select...',
      placeholder: props.placeholder,
      thingsChanged: props.thingsChanged,
      currentValue: props.currentValue,     
      displayName: props.displayName,
      callback: props.callback,
      results: props.results,
      resultsValueKey: props.resultsValueKey,
      resultsLabelKey: props.resultsLabelKey,
      callbackUrl: props.callbackUrl


export const renderSelectAsync = ({ input, label, options,  meta: { touched, error } }) => {
  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      <Select
        name={input.name}
        value={input.value}
        onChange={input.onChange}
        onBlur={() => input.onBlur(input.value)}
        options={options}
        placeholder="Select"
        simpleValue
        clearable={false}
      />
      <p className="text-danger">{touched && (error && <span>{error}</span>)}</p>
    </div>
  )
}
