import * as React from "react";
import { FC, useRef } from "react";
import { Field, Form, Formik } from "formik";
import {
  Box,
  Button,
  FormLabel,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { Message } from "../shared/interfaces/Chat";
import { uuidv4 } from "../shared/utils/randomizers";
import { FormikProps } from "formik/dist/types";
import { FieldProps } from "formik/dist/Field";
import { ErrorMessages } from "../shared/constants/errors";

interface InitialValues {
  message: string;
}

const INITIAL_VALUES: InitialValues = { message: "" };

interface Props {
  onMessageSent: (message: Message) => void;
}

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

export const MessageInput: FC<Props> = ({ onMessageSent }) => {
  const { root } = useStyles();
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
      <Form className={root} data-testid="message-form">
        <Box display="flex" justifyContent="center">
          <Field name="message" placeholder="Say whatever...">
            {({ field, meta }: FieldProps) => (
              <TextField
                id="message-input"
                {...field}
                value={field.value || ""}
                error={!!meta.error}
                helperText={meta.error}
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
