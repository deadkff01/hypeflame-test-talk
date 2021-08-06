import styled from "styled-components";

const InputStyle = styled.div`
  line-height: 1.5;
  border-width: 0;
  border-style: solid;
  border-color: #c7cad9;
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  max-width: 100%;

  .control {
    line-height: 1.5;
    border-width: 0;
    border-style: solid;
    border-color: #c7cad9;
    padding: 0 8px 10px;
    position: relative;
    display: flex;
    flex: 1 1;
    flex-direction: column;
    justify-content: flex-end;

    input {
      border-style: solid;
      border-color: #c7cad9;
      font-family: inherit;
      margin: 0;
      overflow: visible;
      padding: 0;
      color: inherit;
      background: none;
      outline: 0;
      width: 100%;
      border-width: 0;
      font-size: 1.25rem;
      line-height: 1.2;

      &:focus + label {
        transform: translateY(3px);
        font-size: 0.75rem;
      }
    }

    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      appearance: none;
    }

    input[type="number"] {
      appearance: textfield;
    }

    label {
      cursor: text;
      border-width: 0;
      border-style: solid;
      border-color: #c7cad9;
      left: 8px;
      transition: all 0.25s;
      transform-origin: top left;
      transform: translateY(21px);
      font-size: 1.25rem;
      line-height: 1.2;
      top: 0;
      opacity: 0.5;
      position: absolute;
      &.is-shifted {
        transform: translateY(3px);
        font-size: 0.75rem;
      }
    }

    svg {
      position: absolute;
      width: 2rem;
      right: -0.5%;
    }

    &.disabled {
      cursor: not-allowed;
      label {
        cursor: not-allowed;
      }
    }
  }
  .error {
    border-width: 0;
    border-style: solid;
    height: 1.5rem;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    display: inline-block;
    font-size: 0.75rem;
    line-height: 2;
    border-color: #000;
    border-top-width: 1px;

    &.is-active {
      color: #ff001f;
      border-color: #ff001f;
    }
  }

  &.read-only {
    label {
      font-size: 1.25rem !important;
      line-height: 4.2;
      opacity: 1;
      cursor: default !important;
      transform: translateY(3px);
      top: auto;
    }
    input {
      font-weight: bolder;
      cursor: default !important;
    }
    .error {
      display: none !important;
      border: none;
    }
  }
`;

export const Input = ({
  value,
  placeholder = "",
  id,
  error,
  errorMessage,
  disabled,
  onChange,
  type = "text",
  onBlur,
}: any) => {
  return (
    <InputStyle>
      <div className={disabled ? "control disabled" : "control"}>
        <input
          type={type}
          id={id}
          onChange={onChange}
          value={value}
          disabled={disabled}
          onBlur={onBlur}
          data-testid={id}
        />

        <label className={value.length > 0 ? "is-shifted" : ""} htmlFor={id}>
          {placeholder}
        </label>
      </div>

      <span
        className={`error ${error ? "is-active" : ""}`}
        data-testid={`error-${id}`}
      >
        {error ? errorMessage : null}
      </span>
    </InputStyle>
  );
};
