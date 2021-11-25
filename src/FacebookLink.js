import React from "react";

export default function FacebookLink({url, description}) {
  const link = `https://facebook.com/intent/facebook?url=${url}&desc=${description}`;
  return (
      <a style={{paddingLeft: '10px'}} href={link}>Facebook</a>
  );
}