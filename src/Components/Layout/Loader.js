import React from "react";

import { BarLoader } from "react-spinners";

const Loader = ({ loading }) => {
  return (
    <BarLoader
      loading={loading}
      color={"#e94560"}
      width={"100%"}
      height={"5"}
    />
  );
};

export default Loader;
