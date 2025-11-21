import React, { useState } from "react";
import { Manager } from "@twilio/flex-ui";
import { Flex } from "@twilio-paste/core/flex";
import {
    Box,
    Button,
    Modal,
    ModalHeader,
    ModalHeading,
    ModalBody,
    ModalFooter,
    ModalFooterActions,
    Label,
    Input,
    HelpText,
    Text,
} from "@twilio-paste/core";
import { Spinner } from "@twilio-paste/core";
import { useUID } from "@twilio-paste/core/uid-library";
import { SearchIcon } from "@twilio-paste/icons/esm/SearchIcon";

const url = "SERVERLESS_FUNCTION_URL";

const Lookup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [lineDetails, setLineDetails] = useState([])
    const modalHeadingID = useUID();

    const handleSubmit = async () => {
        setIsLoading(true);
        const body = {
            phoneNumber,
            Token: Manager.getInstance().store.getState().flex.session.ssoTokenPayload.token,
        };

        const options = {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response = await fetch(url, options);

        if (response.ok) {
            const data = await response.json();
            setLineDetails(data)
        }
        setIsLoading(false);
    }

    return (
        <Flex hAlignContent="center" vAlignContent="center">
            <Button
                onClick={() => setIsOpen(true)}
                element="SEARCH_BUTTON"
            >
                <SearchIcon
                    decorative={false}
                    title="Lookup button"
                />
            </Button>
            <Modal
                isOpen={isOpen}
                onDismiss={() => setIsOpen(false)}
                size="default"
                ariaLabelledby={modalHeadingID}
            >
                <ModalHeader>
                    <ModalHeading as="h2" id={modalHeadingID}>
                        Query information on a phone number
                    </ModalHeading>
                </ModalHeader>
                <ModalBody>
                    <Box>
                        <Label htmlFor="phone_number" required>Phone number</Label>
                        <Input  
                            aria-describedby="phone_number_num"
                            id="phone_number"
                            name="phone_number"
                            type="text"
                            placeholder="+12345678901"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <HelpText id="phone_number_num">Number needs to be in E.164 format.</HelpText>
                        {isLoading ?
                            <Box marginTop="space60" justifyContent="center" display="flex" alignItems="center">
                                <Spinner decorative={false} title="Loading" size="sizeIcon80" marginTop="space60"/> 
                            </Box> : (
                                lineDetails?.results &&
                                    <Box marginTop="space60">
                                        <Text as="p" fontWeight="fontWeightExtrabold" fontSize="fontSize30">Carrier name:</Text><Text as="p" fontSize="fontSize30" color="colorText">{lineDetails?.results?.carrier_name}</Text>
                                        <Text as="p" fontWeight="fontWeightExtrabold" fontSize="fontSize30">Mobile country code:</Text><Text as="p" fontSize="fontSize30" color="colorText">{lineDetails?.results?.mobile_country_code}</Text>
                                        <Text as="p" fontWeight="fontWeightExtrabold" fontSize="fontSize30">Mobile network code:</Text><Text as="p" fontSize="fontSize30" color="colorText">{lineDetails?.results?.mobile_network_code}</Text>
                                        <Text as="p" fontWeight="fontWeightExtrabold" fontSize="fontSize30">Type:</Text><Text as="p" fontSize="fontSize30" color="colorText">{lineDetails?.results?.type}</Text>
                                    </Box>
                        )}
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <ModalFooterActions>
                        <Button variant="secondary" onClick={() => setIsOpen(false)}>Close</Button>
                        <Button variant="primary" onClick={handleSubmit}>Search</Button>
                    </ModalFooterActions>
                </ModalFooter>
                
            </Modal>
        </Flex>
    )
}

export default Lookup;
