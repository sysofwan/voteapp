from firebase import firebase

def send_to_firebase(userId, sessionId, vote):
	firebaseObj = firebase.FirebaseApplication('https://voteapp.firebaseio.com/', None)
	nodePath = '/voteSessions/' + sessionId
	result = firebaseObj.get(nodePath, None)
	if result and result['info']:
		if not 'stopped' in result['info'] or not result['info']['stopped']:
			firebaseObj.post(nodePath + '/votes/' + userId, vote, {'print': 'pretty'}, {'X_FANCY_HEADER': 'VERY FANCY'})

send_to_firebase('sysofwan', 'test', 'A')
