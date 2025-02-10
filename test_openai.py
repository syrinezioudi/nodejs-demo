import openai

openai.api_key = "your-api-key"  # Replace with your actual API key

# Example API request using the updated method
response = openai.ChatCompletion.create(
  model="gpt-3.5-turbo",  # Or the model you are using
  messages=[
      {"role": "system", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Hello!"},
  ]
)

print(response.choices[0].message['content'])
