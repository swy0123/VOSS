package com.yukgaejang.voss;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@SpringBootTest
@Transactional
@Rollback(value = false)
class VossApplicationTests {

	private static final String COLLECTION_NAME = "chat";

	@Test
	void contextLoads() throws ExecutionException, InterruptedException {
		Firestore db = FirestoreClient.getFirestore();
//		ApiFuture<QuerySnapshot> future = db.collection(COLLECTION_NAME).get();
//		List<QueryDocumentSnapshot> documents = future.get().getDocuments();
		List<Dto> list = new ArrayList<>();
//		for (QueryDocumentSnapshot document : documents) {
//			list.add(document.toObject(Dto.class));
//		}
//		String content = list.get(0).getContent();
//		Long memberId = list.get(0).getMemberId();
//		System.out.println("memberId = " + memberId);
//		System.out.println("content = " + content);

		// 조건 검색
		Query query = db.collection(COLLECTION_NAME)
				.whereEqualTo("memberId", 5)
				.limit(10);
		ApiFuture<QuerySnapshot> future = query.get();
		List<QueryDocumentSnapshot> documents = future.get().getDocuments();
		for (QueryDocumentSnapshot document : documents) {
			System.out.println("document.get(\"memberId\") = " + document.get("memberId"));
		}
//		String content = list.get(0).getContent();
//		Long memberId = list.get(0).getMemberId();
//		System.out.println("memberId = " + memberId);
//		System.out.println("content = " + content);



//		// 저장
//		Firestore firestore = FirestoreClient.getFirestore();
//		ApiFuture<DocumentReference> add = firestore.collection(COLLECTION_NAME).add(new Dto(5L, "1234"));
//		System.out.println(add.get().toString());
	}
	private static class Dto {
		private Long memberId;
		private String content;

		public Dto() {
		}

		public Dto(Long memberId, String content) {
			this.memberId = memberId;
			this.content = content;
		}

		public Long getMemberId() {
			return memberId;
		}

		public void setMemberId(Long memberId) {
			this.memberId = memberId;
		}

		public String getContent() {
			return content;
		}

		public void setContent(String content) {
			this.content = content;
		}
	}
}
