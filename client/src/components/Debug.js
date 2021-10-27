import React, { useState } from "react";
import { Box, Flex, HStack, IconButton, Spinner } from "@chakra-ui/react";
import { SmallCloseIcon, InfoIcon, RepeatIcon } from "@chakra-ui/icons";
import { apiGetDebugData } from "../utils/api";

const DebugButton = ({ data, isLoading, setData, setIsLoading, ...props }) => {
  function getButtonIcon() {
    if (isLoading) return <Spinner />;
    if (data) return <RepeatIcon />;
    return <InfoIcon />;
  }

  return (
    <IconButton
      {...props}
      icon={getButtonIcon()}
      onClick={() => apiGetDebugData(setIsLoading, setData)}
    />
  );
};

const Debug = ({}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!data)
    return (
      <DebugButton
        colorScheme="cyan"
        data={data}
        setData={setData}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        position="fixed"
        left="0"
        bottom="0"
        m="4"
      />
    );

  return (
    <Box mt="8" bg="gray.100" borderRadius="md" p="4" mt="4">
      <Flex justify="flex-end">
        <HStack boxShadow="base" p="1" rounded="md">
          <DebugButton
            data={data}
            setData={setData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
          <IconButton icon={<SmallCloseIcon />} onClick={() => setData(null)} />
        </HStack>
      </Flex>

      <pre>{JSON.stringify(data, true, 2)}</pre>
    </Box>
  );
};

export default Debug;
