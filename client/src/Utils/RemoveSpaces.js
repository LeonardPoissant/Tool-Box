import { useState, useEffect } from "react";

// Mongo does not allow for data base names to have spaces.
// We use this hook to create a space-less dbName to connect
// to mongo while displaying whatever dbName was chosen on the FE.

function useRemoveSpace(title) {
  const [urlTitle, setUrlTitle] = useState(title);
  useEffect(() => {
    const remove = title.replace(/\s+/g, "");
    setUrlTitle(remove);
  });

  return [urlTitle, setUrlTitle];
}

export default useRemoveSpace;
