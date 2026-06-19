function composeEventHandlers<
  E extends {
    defaultPrevented: boolean;
  },
>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
  {
    checkForDefaultPrevented = true,
  }: {
    checkForDefaultPrevented?: boolean | undefined;
  } = {}
): (event: E) => void {
  return (event) => {
    if (originalEventHandler) {
      originalEventHandler(event);
    }

    if (
      !(checkForDefaultPrevented && event.defaultPrevented) &&
      ourEventHandler
    ) {
      ourEventHandler(event);
    }
  };
}

export { composeEventHandlers };
