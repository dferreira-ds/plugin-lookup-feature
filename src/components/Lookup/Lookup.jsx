import React, { useState, useEffect } from "react";
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
} from "@twilio-paste/core";
import { useUID } from "@twilio-paste/core/uid-library";
import { SearchIcon } from "@twilio-paste/icons/esm/SearchIcon";

const url = process.env.SERVERLESS_LOOKUP_FUNCTION;

const Lookup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [lineDetails, setLineDetails] = useState([])
    const modalHeadingID = useUID();

    const handleSubmit = async () => {
        const body = JSON.stringify(phoneNumber);
        const options = {
            method: "POST",
            body,
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response = await fetch(url, options);

        if (response.ok) {
            const data = await response.json();
            setLineDetails(data)
        }
    }

    console.log(lineDetails);

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