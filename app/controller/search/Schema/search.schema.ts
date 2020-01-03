export default {
    "type": "object",
    "required": ["url", "selectors"],
    
    "properties": {
        "url": {
            "type": "string"
        },
        "selectors": {
            "type": "array",
            "items": {
                "type": "string"
            }
        }
    }
}