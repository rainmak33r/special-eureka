import * as React from "react";
import { FC, useRef } from "react";
import { Field, Form, Formik } from "formik";
import { Box, Button, TextField, } from "@material-ui/core";
import { Message } from "../../interfaces/Chat";
import { uuidv4 } from "../../utils/randomizers";
import { FormikProps } from "formik/dist/types";
import { FieldProps } from "formik/dist/Field";
import { ErrorMessages } from "../../constants/errors";

interface InitialValues {
  message: string;
}

const INITIAL_VALUES: InitialValues = { message: "" };

interface Props {
  onMessageSent: (message: Message) => void;
}


export const MessageInput: FC<Props> = ({ onMessageSent }) => {
  const formRef = useRef<FormikProps<InitialValues>>(null);

  const handleSubmit = (values: InitialValues) => {
    const newMessage: Message = {
      id: uuidv4(),
      content: values.message,
      date: new Date(),
    };
    onMessageSent(newMessage);
    formRef?.current?.resetForm();
  };

  const validateForm = (values: InitialValues) =>
    !values.message ? { message: ErrorMessages.empty } : {};

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validate={validateForm}
      innerRef={formRef}
    >
      <Form data-testid="message-form">
        <Box display="flex" alignItems="center">
          <Field name="message" placeholder="Say whatever...">
            {({ field, meta }: FieldProps) => (
              <TextField
                id="message-input"
                {...field}
                value={field.value || ""}
                error={!!meta.error}
                helperText={meta.error || ' '}
                label="Say something..."
              />
            )}
          </Field>
          <Button type="submit" variant="contained" color="primary">
            Send
          </Button>
        </Box>
      </Form>
    </Formik>
  );
};
